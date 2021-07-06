const FormBeginx = ({ startForm, beginData }) => {
    return <div>
        <div>
            {beginData.header}
        </div>
        <div>
            {beginData.desc}
        </div>

        <button className="p-3 m-3 bg-green-200" onClick={startForm}>
            BEGIN
        </button>
    </div>
}
export default FormBeginx