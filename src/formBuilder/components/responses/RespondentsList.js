
import RespondentItem from "./RespondentItem";

const RespondentsList = ({ respondents, handleDelete, handleRespondent }) => {
  return (
    <>
      <div className="overflow-y-auto  md:px-12 md:pl-16">
        {respondents && respondents.length > 0 ? (
          <div>
            {respondents.map((respondent, index) => (
              <RespondentItem
                key={respondent.token}
                token={respondent.token}
                index={index + 1}
               
                isChecked={respondent.isChecked}
                handleRespondent={handleRespondent}
              />
            ))}
          </div>
        ) : (
          <div>No response..</div>
        )}
      </div>
      
    </>
  );
};
export default RespondentsList;
