
import re

def update_code_section(file_path, start_line, end_line, new_content):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        if start_line < 1 or end_line > len(lines) or start_line > end_line:
            return "Error: Invalid line numbers"
        
        # 将新内容分割成行，并确保每行都以换行符结束
        new_lines = [line if line.endswith('\n') else line + '\n' for line in new_content.split('\n')]
        
        # 替换指定行
        lines[start_line-1:end_line] = new_lines
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.writelines(lines)
        
        return f"Successfully updated lines {start_line} to {end_line} in {file_path}"
    
    except Exception as e:
        return f"Error updating file: {str(e)}"

def read_code_section(file_path, start_line, end_line):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        if start_line < 1 or end_line > len(lines) or start_line > end_line:
            return "Error: Invalid line numbers"
        
        return ''.join(lines[start_line-1:end_line])
    
    except Exception as e:
        return f"Error reading file: {str(e)}"

def find_function(file_path, function_name):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        start_line = None
        end_line = None
        in_function = False
        function_indent = 0
        
        print(f"Searching for function: {function_name}")
        for i, line in enumerate(lines):
            stripped_line = line.strip()
            print(f"Line {i+1}: '{line.rstrip()}' (stripped: '{stripped_line}')")
            if stripped_line.startswith(f"def {function_name}("):
                start_line = i + 1
                in_function = True
                function_indent = len(line) - len(line.lstrip())
                print(f"Found function start at line {start_line}, indent: {function_indent}")
            elif in_function:
                if not stripped_line:
                    print(f"Empty line at {i+1}")
                    continue
                current_indent = len(line) - len(line.lstrip())
                print(f"Line {i+1} - Current indent: {current_indent}, Function indent: {function_indent}")
                if current_indent <= function_indent and stripped_line:
                    end_line = i
                    print(f"Found function end at line {end_line}")
                    break
        
        if start_line is not None and end_line is None:
            end_line = len(lines)
            print(f"Function ends at EOF, line {end_line}")
        
        print(f"Final result: start_line = {start_line}, end_line = {end_line}")
        return (start_line, end_line) if start_line is not None and end_line is not None else None
    
    except Exception as e:
        print(f"Error searching for function: {str(e)}")
        return None
