import ReactFullpage from '@fullpage/react-fullpage'; // will return static version on server and "live" version on client
import ReplyQuestion from './ReplyQuestion';

const FormBody = ({ replyArr, moveSection, length }) => {
    return (
        <>
            {(replyArr.length) > 0
                ?
                <>
                    <ReactFullpage
                        //fullpage options
                        licenseKey={'YOUR_KEY_HERE'}
                        scrollingSpeed={1000} /* Options here */

                        render={({ state, fullpageApi }) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    {
                                        replyArr.map((rq, index) =>
                                            <ReplyQuestion key={rq.q_id}
                                                length={length}
                                                fullpageApi={fullpageApi}
                                                rq={rq}
                                                index={index} moveSection={moveSection}
                                            />
                                        )


                                    }
                                </ReactFullpage.Wrapper>
                            )
                        }}
                    />
                </>
                :
                <div>
                    NO QUESTIONS FOR YOU TO ANSWER..
                </div>
            }
            <div> Form Body.. </div>
        </>
    )
}
export default FormBody