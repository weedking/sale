package com.note.mynote.controller;

import com.note.mynote.pojo.Note;
import com.note.mynote.service.noteService;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class MyController {
    @Resource
    private noteService noteService;

    @RequestMapping("/showNote")//查询用户
    @ResponseBody
    @CrossOrigin
    public Note showNote(@RequestParam(value = "no",required = false) String no){
        int no1 = Integer.parseInt(no);
        Note note = this.noteService.getNoteByNo(no1);
//        Note note = this.noteService.getNoteByNo(4);
        return note;
    }

    @RequestMapping("/addNote")//增加用户
    @ResponseBody
    @CrossOrigin
    public Note addNote(@RequestParam(value = "no", required = false) int no,
                        @RequestParam(value = "title", required = false) String title,
                        @RequestParam(value = "author", required = false) String author,
                        @RequestParam(value = "content", required = false) String content,
                        @RequestParam(value = "creatTime", required = false) Date creatTime){
        Note note = new Note();
        note.setNo(no);
        note.setTitle(title);
        note.setAuthor(author);
        note.setContent(content);
        note.setCreateTime(creatTime);
        this.noteService.addNote(note);
        return note;
    }

    @RequestMapping("/deleteNote")//删除用户
    @ResponseBody
    @CrossOrigin
    public int deleteNote(HttpServletRequest request,
                          @RequestParam(value = "no",required = false) int no){
        int no1 = Integer.parseInt(request.getParameter("no"));
        this.noteService.deleteNote(no1);
        return no1;//返回删除的行数
    }

    @RequestMapping("/getNoteList")//查询用户
    @ResponseBody
    @CrossOrigin
    public List<Note> getNoteList(){
        return this.noteService.getNoteList();
//        return note3;
    }
}
