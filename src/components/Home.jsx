import { Card } from "../common/card";
import PageHeader from "../common/pageHeader";
import { useAuth } from "../context/auth.context";
import { useMyCards } from "../hooks/useMyCards";

export function Home(){
  const cards = useMyCards();
  const {user} = useAuth();

  return (<>
    <PageHeader
      title={
        <>
          My cards<i className="bi bi-geo-fill"></i>App
        </>
      }
      description="באתר זה תוכלו למצוא את כל העסקים שאתם מחפשים, כמו כן תוכלו להתחבר כמשתמשים עיסקיים ולפרסם את העסק שלכם"/>
      {user?.biz &&       <div className="row">
        {!cards.length ?(<p>no cards...</p>):(
          cards.map((card,i)=>
            (i===cards.length-1 || i===cards.length-2 || i===cards.length-3) && (<div className="col-4" key={card._id}><Card card={card} ></Card></div>)
          )
        )}
      </div>}
</>
  );
};

export default Home;
