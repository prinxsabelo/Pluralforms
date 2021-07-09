const FormBegin = ({ startForm, beginData }) => {
    return <div>
        {beginData && beginData.header &&
            <div >
                {beginData.header}
            </div>
        }
        {beginData && beginData.dec &&
            <div>
                {beginData.desc}
            </div>

        }

        <button className="p-3 m-3 bg-green-200" onClick={startForm}>
            BEGIN
        </button>
    </div>
}
export default FormBegin