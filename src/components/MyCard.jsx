import { Link } from "react-router-dom";
import PageHeader from "../common/pageHeader";
import { useMyCards } from "../hooks/useMyCards";
import { Card } from "../common/card";
import { useAuth } from "../context/auth.context";

export function MyCards(){
  const cards = useMyCards();
  const {user} = useAuth();
  return (
    <>
      <PageHeader
        title="My Cards"
        description="your cards are in the list below"
      />

      <div className="row">
        {user?.biz && <Link to="/AddCardForm">Create a New Card</Link>}
      </div>

      <div className="row">
        {!cards.length ?(<p>no cards...</p>):(
          cards.map((card)=>
            <div className="col-4" key={card._id}><Card card={card} ></Card></div>
          )
        )}
      </div>
    </>
  );
};


