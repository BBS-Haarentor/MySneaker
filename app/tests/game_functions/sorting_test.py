
from dataclasses import dataclass
import logging

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


def test_sort():
    logging.warning("Starting test")
    unsorted_cars = []
    unsorted_garages = []
    
    car1 = Car(company_id=0, speed=10, year=1984)
    car2 = Car(company_id=1, speed=100, year=2004)
    car3 = Car(company_id=2, speed=0, year=9998)
    
    unsorted_cars.append(car3)
    unsorted_cars.append(car1)
    unsorted_cars.append(car2)


    gar1 = Garage(company_id=0, slots=1, price=5.4)
    gar2 = Garage(company_id=1, slots=1, price=17.5)
    gar3 = Garage(company_id=2, slots=1, price=1.2)
    
    unsorted_garages.append(gar2)
    unsorted_garages.append(gar3)
    unsorted_garages.append(gar1)


    logging.warning(f"{unsorted_cars=}")
    logging.warning(f"{unsorted_garages=}")   
    

    id_sorted_cars: list[Car] = sorted(unsorted_cars, key= lambda x: x.company_id)
    logging.warning(f"{id_sorted_cars=}")
    
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

    
    
    
    
if __name__ == '__main__':
    logging.warning("lol")
    test_sort()
