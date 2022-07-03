
from dataclasses import dataclass
import logging
from types import NoneType

@dataclass
class Car():
    company_id: int
    speed: int
    year: int
    
@dataclass
class Garage():
    company_id: int
    slots: int
    price: float

logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')


def first(iterable, condition = lambda x: True):
    """
    Returns the first item in the `iterable` that
    satisfies the `condition`.

    If the condition is not given, returns the first item of
    the iterable.

    Raises `StopIteration` if no item satysfing the condition is found.

    >>> first( (1,2,3), condition=lambda x: x % 2 == 0)
    2
    >>> first(range(3, 100))
    3
    >>> first( () )
    Traceback (most recent call last):
    ...
    StopIteration
    """

    return next(x for x in iterable if condition(x))


def test_sort():
    logging.warning("Starting test")
    unsorted_cars = []
    unsorted_garages = []
    
    car1 = Car(company_id=0, speed=10, year=1984)
    car2 = Car(company_id=1, speed=100, year=2004)
    car25 = Car(company_id=1, speed=100, year=200)
    car222= Car(company_id=1, speed=100, year=700)
    car3 = Car(company_id=2, speed=0, year=9998)
    
    unsorted_cars.append(car3)
    unsorted_cars.append(car1)
    unsorted_cars.append(car222)
    unsorted_cars.append(car2)
    unsorted_cars.append(car25)


    gar1 = Garage(company_id=0, slots=1, price=5.4)
    gar2 = Garage(company_id=1, slots=1, price=17.5)
    gar3 = Garage(company_id=2, slots=1, price=1.2)
    
    unsorted_garages.append(gar2)
    unsorted_garages.append(gar3)
    unsorted_garages.append(gar1)


    logging.warning(f"{unsorted_cars=}")
    logging.warning(f"{unsorted_garages=}")   
    

    id_sorted_cars: list[Car] = sorted(unsorted_cars, key= lambda x: (x.company_id, -x.year))
    f4 = list(filter(lambda x: x.company_id, id_sorted_cars))
    #filtered = []
    #for car in id_sorted_cars:
    #    if any i in filtered :
    #        filtered.append(car)
    #
    unique: list[Car] = []
    for elem in id_sorted_cars:
        if not any(u.company_id == elem.company_id for u in unique):
            unique.append(elem)
    #object_dict = {x.company_id: x for x in id_sorted_cars}
    #new_dic = list(map(lambda x: [x.company_id, x], unsorted_cars))    #f1 = next(filter(lambda x: x.company_id , id_sorted_cars) , NoneType)
    #f2 = list(map(lambda sublst: filter(lambda x: x.company_id, sublst), id_sorted_cars))
    #f3 = list(map(lambda l: list(filter(None, l.company_id)), id_sorted_cars))
    #fiid: list[Car] = next(iter(id_sorted_cars), lambda x: x.company_id)
    #filtaa = next((x for x in id_sorted_cars if  x in id_sorted_cars), None)
    #id_sorted_cars: list[Car] = sorted(unsorted_cars, key= lambda x: next( x for x in unsorted_cars if ( x.company_id, -x.year)))
    #filtered_id_sorted_cars: list[Car] = [x for x in id_sorted_cars if x not in filtered_id_sorted_cars and filtered_id_sorted_cars.append(x)]
    
    logging.warning(f"{id_sorted_cars=}")
    logging.warning(f"{unique=}")
    logging.warning(f"{f4=}")
    #logging.warning(f"{new_dic=}") 
    
    id_sorted_garages: list[Garage] = sorted(unsorted_garages, key= lambda x: x.company_id)
    logging.warning(f"{id_sorted_garages=}")
    # zip the two lists for sorting by feature only given in one list
    
    
    zipped = zip(id_sorted_cars, id_sorted_garages)
    logging.warning(f"{id_sorted_garages=}")

    sorted_zipped = sorted(zipped, key= lambda x: x[1].price, reverse=True)
    logging.warning(f"{sorted_zipped=}")

    tuples = zip(*sorted_zipped)
    
    l1, l2 = [ list(t) for t in tuples]
    
    logging.warning(f"{l1=}")
    logging.warning(f"{type(l1)=}")
    
    logging.warning(f"{l2=}")
    logging.warning(f"{type(l2)=}")

    
    for i in range(0, len(id_sorted_garages)-1):
        print(f"{id_sorted_garages[i]=}")
    
    
if __name__ == '__main__':
    logging.warning("lol")
    test_sort()
