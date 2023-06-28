import { useParams } from "react-router-dom"
import { useCard } from "../hooks/useCard";
import { useAuth } from "../context/auth.context";

export function CardView(){
    const {id}=useParams();
    const card=useCard(id);
    const {user}=useAuth();
    return (
    <>{card && <div class="card mb-3 w-50">
    <img src={card.bizImage} class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">{card.bizName}</h5>
      <p class="card-text">{card.bizDescription}</p>
      <p class="card-text"><small class="text-body-secondary">{card.bizAddress}</small></p>
    </div>
  </div>}
    </>)
} 