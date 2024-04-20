export const getBackgroundColor = (weatherCondition) => {
  switch (weatherCondition) {
    case "Thunderstorm":
      return "#808080";
    case "Drizzle":
      return "#6495ED";
    case "Rain":
      return "#6495ED";
    case "Snow":
      return "#FFFFFF";
    case "Mist":
      return "#D3D3D3";
    case "Smoke":
      return "#A9A9A9";
    case "Haze":
      return "#A9A9A9";
    case "Dust":
      return "#A9A9A9";
    case "Fog":
      return "#D3D3D3";
    case "Sand":
      return "#D3D3D3";
    case "Ash":
      return "#A9A9A9";
    case "Squall":
      return "#6495ED";
    case "Tornado":
      return "#808080";
    case "Clear":
      return "#87CEEB";
    case "Clouds":
      return "#A9A9A9";
    default:
      return "#FFFFFF";
  }
};
