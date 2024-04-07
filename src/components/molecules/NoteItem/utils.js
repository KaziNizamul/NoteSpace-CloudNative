export default class NoteUtils {
  static colors = [
    "#52348A", // Purple
    "#2F6DAE", // Blue
    "#C35275", // Pink
    "#5E3FA5", // Lavender
    "#005F5F", // Teal
    "#BD3D74", // Magenta
    "#5A36A7", // Indigo
    "#008B8B", // Dark Turquoise
    "#426E70", // Cadet Blue
    "#70539B", // Medium Purple
    "#70539B", // Medium Purple
    "#5E5A98", // Medium Slate Blue
  ];
  static getContrastColor = () => {
    const randomIndex = Math.floor(Math.random() * NoteUtils.colors.length);
    return NoteUtils.colors[randomIndex] || "#000";
  };
}
