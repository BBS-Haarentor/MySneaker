


def check_positive(func):
   def func_wrapper(x, y):
        if x<0 or y<0:
            raise Exception("Both x and y have to be positive for function {} to work".format(func.__name__))
        res = func(x,y)
        return res
   return func_wrapper

def check_gte_zero(func):
    def func_wrapper(x):
        if x<0:
            raise Exception("Needs to be >= 0")
        res = func(x)
        return res
    return func_wrapper