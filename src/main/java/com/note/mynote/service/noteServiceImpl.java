package com.note.mynote.service;

import com.note.mynote.dao.NoteMapper;
import com.note.mynote.pojo.Note;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("noteService")
public class noteServiceImpl implements noteService {
    @Resource
    private NoteMapper noteMapper;

    public Note getNoteByNo(int no){
        return noteMapper.selectByPrimaryKey(no);
    }

    public boolean addNote(Note note){
        boolean result = false;
        try {
            noteMapper.insertSelective(note);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean updateNote(Note note){
        boolean result = false;
        try {
            noteMapper.updateByPrimaryKeySelective(note);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean deleteNote(int no){
        boolean result = false;
//        int id = 0;
        try {
            noteMapper.deleteByPrimaryKey(no);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }



//    public Note getNoteList(){
//        return noteMapper.getNoteList();
//    }

    public List<Note> getNoteList(){
        return  noteMapper.getNoteList();
    }
}
