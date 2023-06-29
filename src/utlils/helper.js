export const trim = (str) => {
  return str?.length > 9 ? str.substring(0, 9) + "..." : str;
};

export const trimID = (str) => {
  return str?.length > 5 ? str.substring(0, 5) + "..." : str;
};

export const formatDate = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleDateString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTextWithHashtags = (text) => {
  const words = text.split(" ");

  return words.map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <span key={index} className="text-[#2596be]">
          {word}{" "}
        </span>
      );
    } else if (word.includes("https")) {
      return (
        <span key={index} className="text-[#2596be]">
          {word}{" "}
        </span>
      );
    } else if (word.includes("@")) {
      return (
        <span key={index} className="text-[#2596be]">
          {word}{" "}
        </span>
      );
    }
    return <span key={index}>{word} </span>;
  });
};
