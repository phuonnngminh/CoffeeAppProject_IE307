import { Text, TouchableOpacity, View } from "react-native";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";

export default function UpDownButton({ count, setCount, color, borderColor }) {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <View className="flex-row items-center space-x-4 border rounded-full p-1 px-4" style={{borderColor: borderColor}}>
      <TouchableOpacity onPress={handleDecrement}>
        <MinusIcon size="20" strokeWidth={3} color={color} />
      </TouchableOpacity>
      <Text
        style={{ color: color }}
        className="font-extrabold text-lg"
      >
        {count}
      </Text>
      <TouchableOpacity onPress={handleIncrement}>
        <PlusIcon size="20" strokeWidth={3} color={color} />
      </TouchableOpacity>
    </View>
  );
}
