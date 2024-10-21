import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {createChapter, deleteChapterById, deleteWordById, findWordsByPartAndLang, getMessages, updateChapterQ, updateWord} from "../service/QuerySenderService";

const EditorComponent = () => {

    const navigate = useNavigate();
    const [termPage, setTermPage] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [findWord, setFindWord] = useState('');
    const [updatedWord, setUpdatedWord] = useState({});
    const [updatedChapter, setUpdatedChapter] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chapterId, setChapterId] = useState(1);
    const [count, setCount] = useState(6);
    const [pageSize, setPageSize] = useState(15);

    const getOffset = () => {
        return pageSize * currentIndex;
    }

    const getWordNumber = (index) => {
        return index + 1 + getOffset();
    }

    useEffect(() => {
        fetchMessages(currentIndex, chapterId);
    }, []);

    const fetchMessages = async (i, chapterId) => {
        try {
            setCurrentIndex(i)
            // const messagesData = await getMessages(`terms?page=${i}&size=${pageSize}`);
            const chapterResponse = await getMessages(`chapters/${chapterId}/terms?page=${currentIndex}&size=${pageSize}`);
            const chaptersData = await getMessages("chapters");
            //  const data = [new Word(1,"one") //     new Word(2,"test"),new Word(3,"data in code")];  //  console.log(data)
            setTermPage((chapterResponse.termPage?.terms?.length !== 0) ? chapterResponse.termPage : []);
            setChapters(chaptersData);
            console.log(chapterResponse.termPage?.terms)
            // setCount(Math.ceil((messagesData.totalElements / pageSize)))
            setCount(Math.ceil((chapterResponse.termPage.totalElements / pageSize)))
        } catch (error) {
            console.error('Failed to fetch terms', error);
        }
    };

    const handleFindWordByChapter = async (e, chapter, i, chapterId) => {
        e.preventDefault()
        setChapterId(chapterId)// => document.getElementById('selectChapter').value)
        setUpdatedChapter(chapter)
        try {
            setCurrentIndex(v => 0)
            const chapterResponse = await findWordsByPartAndLang(`chapters/${chapterId}/terms?page=${i}&size=${pageSize}`);
            console.log(`chapters/${chapterId}/terms?page=${currentIndex}&size=${pageSize}`)

            setTermPage((chapterResponse.termPage?.terms?.length !== 0) ? chapterResponse?.termPage : []);
            setCount(Math.ceil((chapterResponse.termPage?.totalElements / pageSize)))

        } catch (error) {
            console.error('Failed to find words by', error);
            setTermPage([]);
        }
    }

    const goToNextPage = async (e, i) => {
        e.preventDefault()
        try {
            await fetchMessages(i, chapterId);

            console.log("index=" + currentIndex)
        } catch (error) {
            console.error('Failed to find words by', error);
        }
    }

    const handleDeleteById = async (id) => {

        try {
            await deleteWordById(`terms/${id}`);

        } catch (error) {
            console.error('Failed handleDeleteById', error);
        } finally {
            setCurrentIndex(0)
            await fetchMessages(0, chapterId);
        }
    }

    const handlerUpdateWord = async () => {
        try {
            await updateWord(`terms/${updatedWord.id}`, updatedWord);
        } catch (error) {
            console.error('Failed to remove word by', error);
        } finally {
            await fetchMessages(currentIndex, chapterId);
        }
    }

    const handlerUpdateChapter = async () => {
        try {
            await updateChapterQ(`chapters/${updatedChapter.id}`, updatedChapter);
        } catch (error) {
            console.error('Failed handlerUpdateChapter', error);
        } finally {
            await fetchMessages(currentIndex, chapterId);
        }
    }

    function moveToUpdateForm(term) {
        setUpdatedWord(term)
    }

    const handlerCreateWord = async () => {
        try {
            setUpdatedWord({...updatedWord, chapterId: chapterId});
            console.log(updatedWord)
            await createChapter(`terms/create`, updatedWord);
        } catch (error) {
            console.error('Failed handlerCreateWord', error);
        } finally {
            await fetchMessages(currentIndex, chapterId);
        }
    }

    const handlerCreateChapter = async () => {
        try {
            console.log(updatedChapter)
            await createChapter(`chapters/create`, updatedChapter);
        } catch (error) {
            console.error('Failed updatedChapter', error);
        } finally {
            await fetchMessages(currentIndex, chapterId);
        }
    }

    const handlerDeleteChapterById = async (e, id) => {
        e.preventDefault()
        try {
            console.log("chapterId=" + id)
            await deleteChapterById(`chapters/${id}`);

        } catch (error) {
            console.error('Failed handlerDeleteChapterById', error);
        } finally {
            setCurrentIndex(0)
            setChapterId(chapters[0].id)
        }
    }

    return (<>
            <div className="m-5">
                <div className='container'>
                    <div id="form" className={"card-body container"}>
                        <h3><FormattedMessage id='editor_mode'/>:</h3>
                        <br/>
                        <label htmlFor="d"><FormattedMessage id='creare_or_reduct_chapter'/>: </label>

                        <input name={"id"} type="hidden" value={updatedChapter.id} placeholder="id"/>
                        <br/>
                        <input id="d" name={"russian"} type="text" value={updatedChapter.russian} placeholder="ru"
                               required
                               onChange={(e) => setUpdatedChapter({...updatedChapter, russian: e.target.value})}/>
                        <input name={"english"} type="text" value={updatedChapter.english} placeholder="en" required
                               onChange={(e) => setUpdatedChapter({...updatedChapter, english: e.target.value})}/>
                        <input name={"china"} type="text" value={updatedChapter.china} placeholder="ch" required
                               onChange={(e) => setUpdatedChapter({...updatedChapter, china: e.target.value})}/>
                        <input name={"transcription"} type="text" value={updatedChapter.transcription} placeholder="tr"
                               required
                               onChange={(e) => setUpdatedChapter({...updatedChapter, transcription: e.target.value})}/>
                        <button className="btn btn-success" onClick={() => handlerUpdateChapter()}><i
                            className="fa fa-save"></i></button>
                        <button className="btn btn-info" onClick={() => handlerCreateChapter()}><i
                            className="fa fa-plus"></i>
                        </button>
                    </div>
                    <form>
                        <label htmlFor="selectChapter"><FormattedMessage id='find_words_by_chapter'/>: </label>
                        <select id="selectChapter" name="chapter" className="custom-select  m-2"
                                style={{width: '200px'}}>
                            <option disabled>Выбрать</option>
                            {chapters?.map((chapter) => (
                                <option value={chapter.id} key={chapter.id}
                                        onClick={(e) => handleFindWordByChapter(e, chapter, 0, document.getElementById('selectChapter').value)}>
                                    {chapter.english} - {chapter.russian} - {chapter.china}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-outline-danger"
                                onClick={(e) => handlerDeleteChapterById(e, document.getElementById('selectChapter').value)}>
                            <i className="fa fa-trash-o"></i></button>
                        {/*<button type="button" className="btn btn-success"*/}
                        {/*        onClick={(e) => handleFindWordByChapter(e, chapter, 0, document.getElementById('selectChapter').value)}>*/}
                        {/*    <FormattedMessage*/}
                        {/*        id='find_words'/></button>*/}
                    </form>
                    <div id="form" className={"card-body"}>

                        <label htmlFor="r"><FormattedMessage id='creare_or_reduct_term'/>: </label>
                        <input id="r" name={"id"} type="hidden" value={updatedWord.id} placeholder="id"/>
                        <br/>
                        <input name={"russian"} type="text" value={updatedWord.russian} placeholder="ru" required
                               onChange={(e) => setUpdatedWord({...updatedWord, russian: e.target.value})}/>
                        <input name={"english"} type="text" value={updatedWord.english} placeholder="en" required
                               onChange={(e) => setUpdatedWord({...updatedWord, english: e.target.value})}/>
                        <input name={"china"} type="text" value={updatedWord.china} placeholder="ch" required
                               onChange={(e) => setUpdatedWord({...updatedWord, china: e.target.value})}/>
                        <input name={"transcription"} type="text" value={updatedWord.transcription} placeholder="tr"
                               required
                               onChange={(e) => setUpdatedWord({...updatedWord, transcription: e.target.value})}/>
                        <button className="btn btn-success" onClick={() => handlerUpdateWord()}><i
                            className="fa fa-save"></i></button>
                        <button className="btn btn-info" onClick={() => handlerCreateWord()}><i
                            className="fa fa-plus"></i>
                        </button>
                    </div>
                    <div className="container px-4 cen">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">
                                    <div className='text-center'>
                                        <FormattedMessage id='russian'/>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className='text-center'>
                                        <FormattedMessage id='english'/>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className='text-center'>
                                        <FormattedMessage id='china'/>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className='text-center'>
                                        <FormattedMessage id='transcription'/>
                                    </div>
                                </th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {termPage?.terms?.map((term, index) => (
                                <tr key={"table_" + term.id}>
                                    <th scope="row" width='3%'>{getWordNumber(index)}.</th>
                                    {/*<form id={"post_"+term.id} onSubmit={handlerUpdateWord(term.id)}>*/}
                                    <td className='text-center'>{term.russian}</td>
                                    <td className='text-center'>{term.english}</td>
                                    <td className='text-center'>{term.china}</td>
                                    <td className='text-center'>[{term.transcription}]</td>
                                    <td className='text-center'>
                                        <button className="btn btn-success" onClick={() => moveToUpdateForm(term)}><i
                                            className="fa fa-edit"></i>
                                        </button>
                                    </td>
                                    {/*</form>*/}
                                    <td className='text-center'>
                                        <button className="btn btn-danger" onClick={() => handleDeleteById(term.id)}><i
                                            className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        {(termPage?.length === 0) ? <FormattedMessage id='nothing_find'/> : ""}
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item  list-group-item disabled">
                                    <a className="text-success" href="#" tabIndex=""> <FormattedMessage id='previous'/></a>
                                </li>
                                {[...Array(count)].map((e, i) => (
                                    <li className={"list-group-item page-item " + (i === currentIndex ? "bg-light" : "")}
                                        onClick={(elem) => {
                                            goToNextPage(elem, i);
                                        }}
                                        key={"pageIndex_" + i}
                                    ><a className="text-success" href="#">{i + 1}</a></li>))
                                }
                                <li className="page-item list-group-item disabled">
                                    <a className="text-success" href="#"> <FormattedMessage id='next'/></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditorComponent
