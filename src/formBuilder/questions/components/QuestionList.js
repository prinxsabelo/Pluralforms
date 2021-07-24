import { useContext, useState } from "react";

import DeleteModal from "../../../shared/collection/DeleteModal";
import { Context } from "../../../shared/contexts/context";
import QuestionItem from "./QuestionItem";

const QuestionList = (props) => {
  const { questions, handleQuestionDelete, q_count, copyQuestion } = props;

  const { openDeleteModal, closeDeleteModal } = useContext(Context);
  const [question, setQuestion] = useState();

  const checkDelete = (q) => {
    setQuestion(q);
    openDeleteModal();
  };
  const deleteQuestion = () => {
    handleQuestionDelete(question);
    closeDeleteModal();
  }
  // console.log(q_count);
  return (
    <>
      <div className="relative">
        <div className="md:mx-1  md:py-2 q-list pb-8 flex flex-col mt-1">
          {questions.map((q, q_index) => {
            q.q_count = q_count;
            q.q_index = q_index
            return (
              <QuestionItem
                {...q}
                key={q.q_id}
                copyQuestion={copyQuestion}
                checkDelete={checkDelete}
              />
            );
          })}
        </div>
      </div>
      <DeleteModal
        onDelete={deleteQuestion}
        message="Do you really want to delete question?"
      />
    </>
  );
};
export default QuestionList;
