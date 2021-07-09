
import { useState, useContext, useEffect, } from 'react';
import { useParams } from 'react-router-dom';

import { FormReplyContext } from '../../shared/contexts/form-reply.context';
import FormBegin from '../components/FormBegin';
import FormBody from '../components/FormBody';
import FormFooter from '../components/FormFooter';
import FormHeader from '../components/FormHeader';

export const FormReply = () => {
    const { getReply, data } = useContext(FormReplyContext);
    const [loading, setLoading] = useState(true);
    const [replyArr, setReplyArr] = useState([]);
    const [sectionIndex, setSectionIndex] = useState(0);
    const [avatar, setAvatar] = useState("xxx");
    const [beginConfirm, setBeginConfirm] = useState(true);
    const [begin_header, set_begin_header] = useState();
    const [begin_desc, set_begin_desc] = useState();
    //Fetch  form_id from url..
    const { form_id } = useParams();
    //Fetch token from computer IP..
    const token = 1;

    const triggerMove = (move) => {
        console.log(move);
        if (move === "down") {
            document.getElementById(`down${sectionIndex}`).click();
        } else {
            document.getElementById(`up${sectionIndex}`).click();
        }
    }
    const moveSection = (mover, index, fullpageApi) => {
        setSectionIndex(index, sectionIndex);
        if (mover === "down") {
            fullpageApi.moveSectionDown()
        } else {
            fullpageApi.moveSectionUp()
        }

    }
    useEffect(() => {
        if (loading) {
            getReply({ form_id, token });
            if (data) {
                console.log(data);
                setLoading(false)
            }
        }
        if (data.arr) {
            setReplyArr(data.arr);
        }

        const { begin_header, begin_desc, avatar } = data;
        set_begin_header(begin_header);
        set_begin_desc(begin_desc);
        setAvatar(avatar);
    }, [form_id, data, getReply, loading])

    return (
        <>
            {/* {loading ? <div>Loading</div> : <div>Done..</div>} */}

            {beginConfirm ? <FormBegin begin_header={begin_header} begin_desc={begin_desc}
                startForm={() => setBeginConfirm(false)} /> :
                <>
                    <FormHeader avatar={avatar} />
                    <FormBody sectionIndex={sectionIndex} triggerMove={triggerMove} length={replyArr.length} replyArr={replyArr} moveSection={moveSection} />
                    <FormFooter sectionIndex={sectionIndex} triggerMove={triggerMove} length={replyArr.length} />
                </>
            }

        </>
    )
}