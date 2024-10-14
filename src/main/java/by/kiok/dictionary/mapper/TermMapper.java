package by.kiok.dictionary.mapper;

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
    TermResponse termToTermResponse(Term term);

    @Mapping(target = "totalElements", source = "totalElements")
    TermPage termsToTermPage(List<Term> terms, Pageable pageable, Long totalElements);

}
