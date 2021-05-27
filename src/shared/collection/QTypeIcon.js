import {
  ChatAltIcon,
  MenuAlt4Icon,
  StarIcon,
  HeartIcon,
  ThumbUpIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
const QTypeIcon = ({ type, shape, className, color }) => (
  <>
    {type === "TEXT" && (
      <ChatAltIcon
        className={`${className} stroke-current stroke-0`}
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
      />
    )}
    {type === "CHOICE" && (
      <MenuAlt4Icon
        className={`${className} stroke-current stroke-0`}
        aria-hidden="true"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
      />
    )}
    {type === "RATING" && (
      <>
        {(shape === "star" || !shape) && (
          <StarIcon
            className={`${className} stroke-0`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
          />
        )}
        {shape === "heart" && (
          <HeartIcon
            className={`${className} stroke-0`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
          />
        )}
        {shape === "thumb" && (
          <ThumbUpIcon
            className={`${className} stroke-0`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
          />
        )}
      </>
    )}
    {type === "YN" && (
      <ScaleIcon
        className={className}
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
      />
    )}
  </>
);
export default QTypeIcon;
