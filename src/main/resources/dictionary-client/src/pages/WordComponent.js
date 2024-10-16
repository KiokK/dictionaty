import React, { useState, useEffect } from 'react';
import { getMessages, findWordsByPartAndLang } from '../service/QuerySenderService';

import { FormattedMessage } from 'react-intl'

const WordComponent = () => {
    const [termPage, setTermPage] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [findWord, setFindWord] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [count, setCount] = useState(6);
    // const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(15);

    const getOffset = () => {
        return pageSize * currentIndex;
    }

    const getWordNumber = (index) => {
        return index + 1 + getOffset();
    }

    useEffect(() => {
        fetchMessages(currentIndex);
    }, []);

    const fetchMessages = async (i) => {
        try {
            setCurrentIndex(i)
            const messagesData = await getMessages(`terms?page=${i}&size=${pageSize}`);
            const chaptersData = await getMessages("chapters");
          //  const data = [new Word(1,"one") //     new Word(2,"test"),new Word(3,"data in code")];  //  console.log(data)
            setTermPage(messagesData);
            setChapters(chaptersData);
            setCount(Math.ceil((messagesData.totalElements / pageSize)))
        } catch (error) {
            console.error('Failed to fetch terms', error);
        }
    };

    const handleFindWordByChapter = async (e) => {
     //   e.preventDefault()
        try {
            const chapterId = document.getElementById('selectChapter').value;

            const chapterResponse = await findWordsByPartAndLang(`chapters/${chapterId}/terms?page=${currentIndex}&size=${pageSize}`);
            console.log(`chapters/${chapterId}/terms?page=${currentIndex}&size=${pageSize}`)
            // fetchMessages();
            console.log(chapterResponse?.termPage.terms?.length)
            setTermPage((chapterResponse.termPage?.terms?.length !== 0) ? chapterResponse.termPage : []);
            setCount(Math.ceil((chapterResponse.termPage.totalElements / pageSize)))
        } catch (error) {
            console.error('Failed to find words by', error);
            setTermPage([]);
        }
    }

    const handleFindWord = async (e) => {
        e.preventDefault()
        try {
            const lang = document.getElementById('selectLang').value;
            const data = await findWordsByPartAndLang(`terms/find?part=${findWord}&lang=${lang}`, {});

           // fetchMessages();
            setTermPage(data);
            setCount(Math.ceil((data.totalElements / pageSize)))
           // setNewMessage('');
        } catch (error) {
            console.error('Failed to find words by', error);
            setTermPage([]);
        }
    };

    const  goToNextPage = async (e, i) => {
        e.preventDefault()
        try {
            await fetchMessages(i);
            setCurrentIndex(i)
        } catch (error) {
            console.error('Failed to find words by', error);
        }
    }

    return (
        <div>
            <div className="App">
                {/*<h1>Заголовок</h1>*/}
                <br/>
                <form>
                    <label htmlFor="chapter"><FormattedMessage id='find_words_by_chapter'/>: </label>
                    <select id="selectChapter" name="chapter"  className="custom-select  m-2" style={{width:'200px'}}>
                        <option disabled>Выбрать</option>
                        {chapters?.map((chapter) => (
                            <option value={chapter.id} key={chapter.id}>
                                {chapter.english} - {chapter.russian} - {chapter.china}
                            </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-success" onClick={handleFindWordByChapter}><FormattedMessage id='find_words'/></button>
                </form>
                <br/>
                <form>
                    <label htmlFor="language"><FormattedMessage id='find_words_by_part'/>: </label>
                    <select id="selectLang" name="lang" className="custom-select m-2" style={{width:'200px'}}>
                        <option disabled><FormattedMessage id='select'/></option>
                        <option value="ru"><FormattedMessage id='russian'/></option>
                        <option value="en"><FormattedMessage id='english'/></option>
                        <option value="ch"><FormattedMessage id='china'/></option>
                    </select>
                    <input
                        type="text" value={findWord}
                        onChange={(e) => setFindWord(e.target.value)}
                        placeholder="..."
                    />
                    <button type="button" className="btn btn-success  m-2" onClick={handleFindWord}><FormattedMessage id='find_words'/></button>
                </form>
            </div>
            <br/>
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
                    </tr>
                    </thead>
                    <tbody>
                    {termPage?.terms?.map((term, index) => (
                        <tr key={"table_"+term.id} >
                            <th scope="row" width='3%'>{getWordNumber(index)}.</th>
                            <td className='text-center'>{term.russian}</td>
                            <td className='text-center'>{term.english}</td>
                            <td className='text-center'>{term.china}</td>
                            <td className='text-center'>[{term.transcription}]</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
                {(termPage?.length === 0) ? <FormattedMessage id='nothing_find'/> : "" }
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item  list-group-item disabled">
                            <a className="text-success" href="#" tabIndex="-1"> <FormattedMessage id='previous'/></a>
                        </li>
                        {[...Array(count)].map((e, i) => (
                            <li className={"list-group-item page-item " + (i === currentIndex ? "bg-light" : "")}
                                onClick={(elem) => {goToNextPage(elem, i).then(setCurrentIndex(i))}}
                                key={"pageIndex_"+i}
                            ><a className="text-success" href="#">{i + 1}</a></li>))
                        }
                        <li className="page-item list-group-item disabled">
                            <a className="text-success" href="#"> <FormattedMessage id='next'/></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default WordComponent;
