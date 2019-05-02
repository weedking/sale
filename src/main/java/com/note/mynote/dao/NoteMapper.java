package com.note.mynote.dao;

import com.note.mynote.pojo.Note;
import com.note.mynote.pojo.NoteExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;
import org.apache.ibatis.type.JdbcType;

public interface NoteMapper {
    @SelectProvider(type=NoteSqlProvider.class, method="countByExample")
    int countByExample(NoteExample example);

    @DeleteProvider(type=NoteSqlProvider.class, method="deleteByExample")
    int deleteByExample(NoteExample example);

    @Delete({
        "delete from NOTE",
        "where NO = #{no,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer no);

    @Insert({
        "insert into NOTE (NO, TITLE, ",
        "AUTHOR, CONTENT, ",
        "CREATE_TIME)",
        "values (#{no,jdbcType=INTEGER}, #{title,jdbcType=VARCHAR}, ",
        "#{author,jdbcType=VARCHAR}, #{content,jdbcType=VARCHAR}, ",
        "#{createTime,jdbcType=TIMESTAMP})"
    })
    int insert(Note record);

    @InsertProvider(type=NoteSqlProvider.class, method="insertSelective")
    int insertSelective(Note record);

    @SelectProvider(type=NoteSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="NO", property="no", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="TITLE", property="title", jdbcType=JdbcType.VARCHAR),
        @Result(column="AUTHOR", property="author", jdbcType=JdbcType.VARCHAR),
        @Result(column="CONTENT", property="content", jdbcType=JdbcType.VARCHAR),
        @Result(column="CREATE_TIME", property="createTime", jdbcType=JdbcType.TIMESTAMP)
    })
    List<Note> selectByExample(NoteExample example);

    @Select({
        "select",
        "NO, TITLE, AUTHOR, CONTENT, CREATE_TIME",
        "from NOTE",
        "where NO = #{no,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="NO", property="no", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="TITLE", property="title", jdbcType=JdbcType.VARCHAR),
        @Result(column="AUTHOR", property="author", jdbcType=JdbcType.VARCHAR),
        @Result(column="CONTENT", property="content", jdbcType=JdbcType.VARCHAR),
        @Result(column="CREATE_TIME", property="createTime", jdbcType=JdbcType.TIMESTAMP)
    })
    Note selectByPrimaryKey(Integer no);

    @UpdateProvider(type=NoteSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") Note record, @Param("example") NoteExample example);

    @UpdateProvider(type=NoteSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") Note record, @Param("example") NoteExample example);

    @UpdateProvider(type=NoteSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(Note record);

    @Update({
        "update NOTE",
        "set TITLE = #{title,jdbcType=VARCHAR},",
          "AUTHOR = #{author,jdbcType=VARCHAR},",
          "CONTENT = #{content,jdbcType=VARCHAR},",
          "CREATE_TIME = #{createTime,jdbcType=TIMESTAMP}",
        "where NO = #{no,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Note record);

    @Select({
            "select",
            "NO, TITLE, AUTHOR, CONTENT, CREATE_TIME",
            "from NOTE"
    })
    @Results({
            @Result(column="NO", property="no", jdbcType=JdbcType.INTEGER, id=true),
            @Result(column="TITLE", property="title", jdbcType=JdbcType.VARCHAR),
            @Result(column="AUTHOR", property="author", jdbcType=JdbcType.VARCHAR),
            @Result(column="CONTENT", property="content", jdbcType=JdbcType.VARCHAR),
            @Result(column="CREATE_TIME", property="createTime", jdbcType=JdbcType.TIMESTAMP)
    })
      List<Note> getNoteList();
//        Note getNoteList();
}