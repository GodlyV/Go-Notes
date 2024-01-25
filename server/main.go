package main

import (
	"context"
	"log"
	"net"

	pb "github.com/GodlyV/Go-Notes/proto" // adjust with actual path
	"github.com/jackc/pgx/v4"
	"google.golang.org/grpc"
)


var db *pgx.Conn

func connectToDB() {
    var err error
    db, err = pgx.Connect(context.Background(), "postgres://postgres:postgres@postgres_db:5432/notes")
    if err != nil {
        log.Fatalf("Unable to connect to database: %v", err)
    }
}


type notesServer struct {
    pb.UnimplementedNotesServiceServer
}


func (s *notesServer) GetNotes(ctx context.Context, req *pb.GetNotesRequest) (*pb.GetNotesResponse, error) {
    rows, err := db.Query(ctx, "SELECT * FROM notes WHERE uid = $1 ORDER BY last_modified DESC", req.GetUid())
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var notes []*pb.Note
    for rows.Next() {
        var note pb.Note
        err := rows.Scan(&note.Nid, &note.Uid, &note.Title, &note.Text, &note.LastModified)
        if err != nil {
            return nil, err
        }
        notes = append(notes, &note)
    }

    return &pb.GetNotesResponse{Notes: notes}, nil
}


func main() {
    connectToDB()
    defer db.Close(context.Background())

    lis, err := net.Listen("tcp", ":3001")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    pb.RegisterNotesServiceServer(s, &notesServer{})
    log.Printf("server listening at %v", lis.Addr())
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}


