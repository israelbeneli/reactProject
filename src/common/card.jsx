import { Link } from "react-router-dom";

export function Card({card:{_id,bizName,bizDescription,bizAddress,bizPhone,bizImage},isbiz=true}){
    return(
<div className="card" style={{ width: "100%" }}>
      <img src={bizImage} className="card-img-top" alt={bizName} />
      <div className="card-body">
        <h5 className="card-title">{bizName}</h5>
        <p className="card-text">{bizDescription}</p>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">{bizAddress}</li>
          <li className="list-group-item">{bizPhone}</li>
        </ul>
      {isbiz && <>
        <Link to={`/My-cards/edit/${_id}`} className="card-link">
          edit
        </Link>
        <Link to={`/My-cards/delete/${_id}`} className="card-link">
          delete
        </Link>
        <Link to={`/My-cards/view/${_id}`} className="card-link">
          viewCard
        </Link>
        </>}
      </div>
    </div>
    )
}