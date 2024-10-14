package by.kiok.dictionary.mapper;

import by.kiok.dictionary.dto.response.ChapterInfoResponse;
import by.kiok.dictionary.dto.response.ChapterResponse;
import by.kiok.dictionary.model.Chapter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {TermMapper.class})
public interface ChapterMapper {

    @Mapping(target = "china", source = "chapter.theme.china")
    @Mapping(target = "russian", source = "chapter.theme.russian")
    @Mapping(target = "english", source = "chapter.theme.english")
    @Mapping(target = "transcription", source = "chapter.theme.transcription")
    @Mapping(target = "termPage.terms", source = "chapter.terms")
    @Mapping(target = "termPage.pageable", source = "pageable")
    @Mapping(target = "termPage.totalElements", source = "totalElements")
    ChapterResponse toChapterResponse(Chapter chapter, Pageable pageable, Long totalElements);

    List<ChapterInfoResponse> toListChapterInfoResponse(List<Chapter> chapters);

    @Mapping(target = "china", source = "theme.china")
    @Mapping(target = "russian", source = "theme.russian")
    @Mapping(target = "english", source = "theme.english")
    @Mapping(target = "transcription", source = "theme.transcription")
    ChapterInfoResponse toChapterInfoResponse(Chapter chapter);
}
