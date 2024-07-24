import React, { useCallback, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';
import { borders, colors } from '@chatty/theme';
import { Typography } from '../typography';
import { Icon } from '../icon';

interface InputProps extends TextInputProps {
  control: Control<FieldValues>;
  name: string;
  rules?: RegisterOptions;
  label: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  control,
  name,
  rules,
  label,
  secureTextEntry,
  ...inputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const handleBlur = useCallback(() => {
          onBlur();
          setIsFocused(false);
        }, []);

        const handleFocus = useCallback(() => {
          setIsFocused(true);
        }, []);

        const inputBorderColor = isFocused
          ? colors.plum500
          : error
          ? colors.error
          : 'white';

        return (
          <View>
            <Typography variant='label' color='white'>
              {label}
            </Typography>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: inputBorderColor,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                clearButtonMode={!secureTextEntry ? 'while-editing' : 'never'}
                {...inputProps}
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.iconContainer}
                >
                  {isPasswordVisible ? <Icon.visionLow /> : <Icon.vision />}
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <Typography
                variant='specialText'
                color={'error'}
                style={{ textAlign: 'right' }}
              >
                {error.message}
              </Typography>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: borders.ssm,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 10,
  },
  errorText: {
    textAlign: 'right',
  },
});

export default Input;
