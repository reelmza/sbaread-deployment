export const login = async (email: string, password: string) => {
    console.log("Logging in with:", email, password);
    // Simulate API Call
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };
  