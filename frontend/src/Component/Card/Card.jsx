import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 25px;
`;

const CardTitle = styled.h3`
  color: #1f5b64;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const CardDate = styled.div`
  color: #6ba7b6;
  font-size: 14px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    font-size: 12px;
  }
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CardMedia = styled.div`
  margin-top: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 4px 12px;
  background: #e9f6fa;
  color: #1f5b64;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

function Card({ 
  image, 
  title, 
  date, 
  description, 
  media,
  tags = [],
  location,
  attendees,
  ...props 
}) {
  return (
    <CardContainer {...props}>
      {image && <CardImage src={image} alt={title} />}
      
      <CardContent>
        <CardTitle>{title}</CardTitle>
        
        {date && (
          <CardDate>
            <i className="far fa-calendar"></i>
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </CardDate>
        )}
        
        {location && (
          <CardDate>
            <i className="fas fa-map-marker-alt"></i>
            {location}
          </CardDate>
        )}
        
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
        
        {tags.length > 0 && (
          <TagContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagContainer>
        )}
        
        {attendees !== undefined && (
          <CardDate>
            <i className="fas fa-users"></i>
            {attendees} attendees
          </CardDate>
        )}
        
        {media && <CardMedia>{media}</CardMedia>}
      </CardContent>
    </CardContainer>
  );
}

export default Card;