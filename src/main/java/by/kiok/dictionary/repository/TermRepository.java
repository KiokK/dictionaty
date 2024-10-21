package by.kiok.dictionary.repository;

import by.kiok.dictionary.model.Term;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TermRepository extends JpaRepository<Term, Long> {

    List<Term> findByWord_RussianStartsWithOrderByWord_Russian(String russianWord, Pageable pageable);

    List<Term> findByWord_ChinaStartsWithOrderByWord_China(String chinaWord, Pageable pageable);

    List<Term> findByWord_EnglishStartsWithOrderByWord_English(String englishWord, Pageable pageable);

    List<Term> findByChapter_Id(Long chapterId, Pageable pageable);

    Long countByWord_RussianStartsWith(String russianWord);

    Long countByWord_ChinaStartsWith(String chinaWord);

    Long countByWord_EnglishStartsWith(String englishWord);

    Long countByChapter_Id(Long chapterId);
}
