import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardservice";
import { toast } from "react-toastify";

const CardsDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteCard = async () => {
      await cardsService.deleteCard(id);
      navigate("/My-cards");
      toast("The card is deleted",{
        position: toast.POSITION.TOP_RIGHT
    });
    };

    deleteCard();
  }, [id, navigate]);

  return null;
};

export default CardsDelete;