import { useContext, useState } from "react";

import DeleteModal from "../../../shared/collection/DeleteModal";
import { Context } from "../../../shared/contexts/context";
import { BuildQuestionContext } from "../../../shared/contexts/build-question.context";
import QuestionItem from "./QuestionItem";

const QuestionList = (props) => {
  const { deleteQuestion } = useContext(BuildQuestionContext);

  const { openDeleteModal, closeDeleteModal } = useContext(Context);
  const [question, setQuestion] = useState();

  const checkDelete = (q) => {
    setQuestion(q);
    openDeleteModal();
  };
  const handleDelete = () => {
    closeDeleteModal();
    deleteQuestion(question);
  };
  const { questions } = props;

  return (
    <>
      <div className="relative">
        <div className="md:mx-1  md:py-2 q-list pb-8 ">
          {questions.map((q, index) => {
            return (
              <QuestionItem
                qlength={questions.length}
                {...q}
                key={q.q_id}
                index={(index += 1)}
                checkDelete={checkDelete}
              />
            );
          })}
        </div>
      </div>
      <DeleteModal
        onDelete={handleDelete}
        message="Do you really want to delete question?"
      />
    </>
  );
};
export default QuestionList;
