import React from "react";
import "./Blog_Card.css";
import Typography from "@mui/material/Typography";

export const BlogCard = ({ imgSrc, imgAlt, title, author, link }) => {
  return (
    <div className="blog-card">
      <img src={imgSrc} alt={imgAlt} className="blog-card__image" />
      <div className="blog-card__content">
        <p className="blog-card__author">{author && <Typography sx={(theme) => ({ color: theme.palette.mode == "dark" ? "#81c784" : "#52911f", fontSize: "13px" })}>{author}</Typography>}</p>
        <a href={link} className="blog-card__title">
          {title && <Typography sx={(theme) => ({ color: theme.palette.mode === "dark" ? "#fff" : "#000", fontSize: "16px", fontWeight: "bold" })}>{title} </Typography>}
        </a>
      </div>
    </div>
  );
};
