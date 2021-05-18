import pandas

pop = pandas.read_csv('population.csv', dtype=str)
print(len(pop))

verb = pandas.read_csv('verblijfsobjecten_nederland.csv')
print(len(verb))

print(len(pop) == len(verb))