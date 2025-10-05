def add(a, b):
    return a + b

def greet(name):
    for i in range(3):
        print(f"Hello, {name}! (#{i+1})")

if __name__ == "__main__":
    result = add(2, 5)
    print("Sum is:", result)
    greet("Bitch")
