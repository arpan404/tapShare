import generateUserId from "./generateUserId";
export default function storeUser(): void {
  if (
    localStorage.getItem("userID") == null ||
    localStorage.getItem("userID") == "" ||
    localStorage.getItem("userID") == undefined
  ) {
    const userId: string = generateUserId();
    localStorage.setItem("userID", userId);
  }
}
