import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import './index.css';
import { useState } from "react";

const schema = z.object({
  address: z.string().min(3, "Enter your address correctly"),
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  Rollno: z.string().min(12, "Roll number must be exactly 12 characters long."),
  Branch: z.string().min(3, "Branch name must be at least 3 characters long."),
  City: z.string().min(3, "City name must be at least 3 characters long."),
  State: z.string().min(3, "State name must be at least 3 characters long."),
  Number: z.string().min(10, "Phone number must be at least 10 digits long."),
  Gender: z.string().min(1, "Gender should be selected"),
  hobbies: z.array(z.string()).min(1, "At least one hobby should be selected"),
});


function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });
  
  const [imageURL, setImageURL] = useState(null);

  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file); 
      setImageURL(imageUrl);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      imageURL: imageURL, 
    };

    console.log("Form data submitted:", formData); 
    alert('Data submitted successfully');
    reset();
    setImageURL(null); 
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="pic">
          <img src={imageURL || "images/proflie.png"} id="profilePic" alt="Profile" />
          <label htmlFor="input-file">Profile pic</label>
          <input type="file" accept="image/jpeg, image/png, image/jpg" id="input-file" {...register("image")} 
            onChange={handleImageChange} 
          />
        </div>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />
        {errors.username && <span>{errors.username.message}</span>}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <label htmlFor="Gender">Gender</label>
        <div className="gender">
          Male 
          <input type="radio" id="Gender1" value="Male" {...register("Gender")} />
          Female 
          <input type="radio" id="Gender2" value="Female" {...register("Gender")} />
          Others 
          <input type="radio" id="Gender3" value="Others" {...register("Gender")} />
        </div>
        {errors.Gender && <span>{errors.Gender.message}</span>}

        <label htmlFor="Rollno">Roll Number</label>
        <input type="text" id="Rollno" {...register("Rollno")} />
        {errors.Rollno && <span>{errors.Rollno.message}</span>}

        <label htmlFor="Branch">Branch</label>
        <select id="Branch" {...register("Branch")}>
          <option value="">Select your Branch</option>
          <option value="CSE">Computer Science Engineering</option>
          <option value="ECE">Electronics and Communication Engineering</option>
          <option value="IT">Information Technology</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Civil Engineering</option>
        </select>
        {errors.Branch && <span>{errors.Branch.message}</span>}

        <label htmlFor="City">City</label>
        <input type="text" id="City" {...register("City")} />
        {errors.City && <span>{errors.City.message}</span>}

        <label htmlFor="State">State</label>
        <input type="text" id="State" {...register("State")} />
        {errors.State && <span>{errors.State.message}</span>}

        <label htmlFor="address">Address</label>
        <textarea id="address" {...register("address")} />
        {errors.address && <span>{errors.address.message}</span>}

        <label htmlFor="Number">Phone Number</label>
        <input type="text" id="Number" {...register("Number")} />
        {errors.Number && <span>{errors.Number.message}</span>}

        <label htmlFor="hobbies">Hobbies</label>
        <div className="hobbie">
            <input type="checkbox" id="hobbies1" value="cooking" {...register("hobbies")} />
            Cooking
            <input type="checkbox"  id="hobbies2" value="traveling" {...register("hobbies")} />
            Traveling
            <input type="checkbox"  id="hobbies3" value="painting" {...register("hobbies")} />
            Painting
        </div>
        {errors.hobbies && <span>{errors.hobbies.message}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
