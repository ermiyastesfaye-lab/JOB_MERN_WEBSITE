def metro(n, s, a, b):
    s -= 1

    if not a[0]:
        return "NO"

    if a[s]:
        return "YES"
    elif not b[s]:
        return "NO"

    for i in range(s, n):
        if a[i] and b[i]:
            return "YES"
    
    return "NO"

n, s = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split())) 
print(metro(n, s, a, b))
