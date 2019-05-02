package com.note.mynote.service;

import com.note.mynote.pojo.Note;

import java.util.List;

public interface noteService {
    public Note getNoteByNo(int no);
    boolean addNote(Note note);
    boolean updateNote(Note note);
    boolean deleteNote(int no);

//    public Note getNoteList();
    public List<Note> getNoteList();
}
