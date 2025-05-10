
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormInput({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  error = "" 
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1"
      />
      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </div>
  );
}
