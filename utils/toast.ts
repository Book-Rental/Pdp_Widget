const showToast = (
    message: string,
    type: "success" | "error" = "success"
) => {
    console.log("showToast called", message, type);

    window.dispatchEvent(
        new CustomEvent("app-toast-notification", {
            detail: {
                message,
                type,
            },
        })
    );
};