package by.kiok.dictionary.mapper;

import by.kiok.dictionary.dto.request.TermRequest;
import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.dto.response.TermResponse;
import by.kiok.dictionary.model.Term;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TermMapper {

    @Mapping(target = "china", source = "term.word.china")
    @Mapping(target = "russian", source = "word.russian")
    @Mapping(target = "english", source = "word.english")
    @Mapping(target = "transcription", source = "word.transcription")
    @Mapping(target = "chapterId", source = "chapter.id")
    TermResponse termToTermResponse(Term term);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "word.china", source = "newTerm.china")
    @Mapping(target = "word.russian", source = "newTerm.russian")
    @Mapping(target = "word.english", source = "newTerm.english")
    @Mapping(target = "word.transcription", source = "newTerm.transcription")
    @Mapping(target = "chapter.id", source = "newTerm.chapterId")
    Term toNewTerm(Long id, TermRequest newTerm);

    @Mapping(target = "word.china", source = "china")
    @Mapping(target = "word.russian", source = "russian")
    @Mapping(target = "word.english", source = "english")
    @Mapping(target = "word.transcription", source = "transcription")
    @Mapping(target = "chapter.id", source = "newTerm.chapterId")
    Term termRequestToTerm(TermRequest newTerm);

    @Mapping(target = "totalElements", source = "totalElements")
    TermPage termsToTermPage(List<Term> terms, Pageable pageable, Long totalElements);

}
