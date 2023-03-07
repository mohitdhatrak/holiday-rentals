import { toast } from "react-toastify";

export function validateForm(data, formType) {
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    const phone = data.get("phone");
    const confirmPassword = data.get("confirmPassword");

    const regexEmail =
        /^[\w#!%\$'&\+\*-/\?\^`\.\{\|\}~=]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;

    const regexPhone = /^(0|\+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}$/;

    const regexPassword =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).*$/;

    if (
        name?.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword?.trim() === ""
    ) {
        toast.error("Please fill all compulsory fields!");
        return false;
    } else if (
        !regexEmail.test(email.trim()) ||
        email.startsWith(".") ||
        email.endsWith(".") ||
        email.endsWith("-") ||
        email.includes("..") ||
        email.includes(".@") ||
        email.includes("@-")
    ) {
        toast.error("Please enter a valid email!");
        return false;
    } else if (
        formType === "signup" &&
        phone?.trim() !== "" &&
        !regexPhone.test(phone?.trim())
    ) {
        toast.error("Please enter a valid phone number!");
        return false;
    } else if (password.trim().length < 8) {
        toast.error("Password must be atleast 8 characters long!");
        return false;
    } else if (!regexPassword.test(password.trim())) {
        toast.error(
            "Password must contain atleast 1 special character, 1 numeric value and 1 uppercase & lowercase letter each!"
        );
        return false;
    } else if (formType === "signup" && password !== confirmPassword) {
        toast.error("Passwords don't match!");
        return false;
    }

    return true;
}
