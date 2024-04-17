// Tweet.js
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: 'white',
  });
  
  const StyledIconButton = styled(IconButton)({
    flex: 1, // Para que los botones se expandan y ocupen el espacio disponible
  });

const StyledCard = styled(Card)({
  maxWidth: 625, // Solo establecemos el maxWidth
  backgroundColor: 'black',
  color: 'white',
  border: '1px solid grey',
  minWidth: 625
});

export default function RecipeReviewCard({ 
  nombre = "Manuel Rodas 11", 
  date = "Date", 
  tweetContent = "Este es un tweet", 
  comentario1 = "Comentario 1", 
  comentario2 = "Comentario 2", 
  onButtonPress,
  tweetHashtags = [], // Valor predeterminado para tweetHashtags
  tweetLinks = [], // Valor predeterminado para tweetLinks
  showDeleteButton = false // Valor predeterminado para showDeleteButton
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [likePressed, setLikePressed] = React.useState(false);
  const [retweetPressed, setRetweetPressed] = React.useState(false);
  const [favoritePressed, setFavoritePressed] = React.useState(false);
  const [deletePressed, setDeletePressed] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    setLikePressed(!likePressed);
    onButtonPress("like", !likePressed); // Llama a la función de devolución de llamada con el tipo de botón y su estado actual
  };

  const handleRetweetClick = () => {
    setRetweetPressed(!retweetPressed);
    onButtonPress("retweet", !retweetPressed); // Llama a la función de devolución de llamada con el tipo de botón y su estado actual
  };

  const handleFavoriteClick = () => {
    setFavoritePressed(!favoritePressed);
    onButtonPress("favorite", !favoritePressed); // Llama a la función de devolución de llamada con el tipo de botón y su estado actual
  };

  const handleDeleteClick = () => {
    setDeletePressed(!deletePressed);
    onButtonPress("delete", !deletePressed); // Llama a la función de devolución de llamada con el tipo de botón y su estado actual
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            -
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={nombre}
        subheader={date}
        subheaderTypographyProps={{ sx: { color: 'white' } }} // Cambiar el color de la fecha a blanco
      />
      <CardContent sx={{ color: 'white' }}>
        <Typography variant="body2" color="white">
          {tweetContent}
        </Typography>
        <Typography variant="body2" color="white">
          {tweetHashtags.map((hashtag, index) => ( // Mapear cada hashtag en tweetHashtags  y mostrarlo 
            <span key={index} style={{ color: 'skyblue' }}> {hashtag} </span>
          ))}
        </Typography>
        <br />
        <Typography variant="body2" color="white">
            {tweetLinks.map((link, index) => ( // Mapear cada enlace en tweetLinks y mostrarlo
                <React.Fragment key={index}>
                    <a href={link} style={{ color: 'blue' }}> {link} </a>
                    <br />
                </React.Fragment>
            ))}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ButtonContainer>
          <StyledIconButton aria-label="like" onClick={handleLikeClick}>
            <FavoriteIcon style={{ color: likePressed ? 'red' : 'grey' }} />
          </StyledIconButton>
          <StyledIconButton aria-label="Retweet" onClick={handleRetweetClick}>
            <AiOutlineTrademarkCircle style={{ color: retweetPressed ? 'green' : 'grey' }} />
          </StyledIconButton>
          <StyledIconButton aria-label="favorite" onClick={handleFavoriteClick}>
            <BsBookmark style={{ color: favoritePressed ? 'blue' : 'grey' }} />
          </StyledIconButton>
          {showDeleteButton && ( // Condición para mostrar el botón de borrar
            <StyledIconButton aria-label="delete" onClick={handleDeleteClick}>
              <FaRegTrashAlt style={{ color: 'grey' }} />
            </StyledIconButton>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MdOutlineMarkChatUnread style={{ color: 'grey' }} />
          </ExpandMore>
        </ButtonContainer>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ color: 'white' }}>
          <Typography paragraph style={{ borderBottom: '1px solid grey' }}>
            {comentario1}
          </Typography>
          <Typography style={{ borderBottom: '1px solid grey' }}>
            {comentario2}
          </Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}