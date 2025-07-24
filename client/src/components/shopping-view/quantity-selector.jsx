import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  maxStock,
  disabled = false 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(quantity.toString());

  useEffect(() => {
    setEditValue(quantity.toString());
  }, [quantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue(quantity.toString());
  };

  const handleEditSubmit = () => {
    const newValue = parseInt(editValue);
    if (newValue && newValue > 0 && newValue <= maxStock) {
      onQuantityChange(newValue);
    } else {
      setEditValue(quantity.toString());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(quantity.toString());
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className="flex items-center justify-center border rounded-md">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-none border-r"
        onClick={handleDecrease}
        disabled={disabled || quantity <= 1}
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <div className="flex-1 flex items-center justify-center min-w-[50px]">
        {isEditing ? (
          <Input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyPress}
            className="h-6 text-center border-0 rounded-none p-0 text-sm"
            min="1"
            max={maxStock}
            autoFocus
          />
        ) : (
          <span
            className="text-sm font-medium cursor-pointer px-2 py-1 hover:bg-gray-50 rounded"
            onClick={handleEditStart}
          >
            {quantity}
          </span>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-none border-l"
        onClick={handleIncrease}
        disabled={disabled || quantity >= maxStock}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}

export default QuantitySelector; 