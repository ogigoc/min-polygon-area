import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
import json

def read_test_case(path):
    lines = open(path, 'r').readlines()
    return [[round(float((l.split(' ')[0]))), round(float((l.split(' ')[1])))] for l in lines[1:]]

def plot_polygon(points):
    polygon = Polygon(points, True)
    fig, ax = plt.subplots()
    ax.add_patch(polygon)
    plt.autoscale()
    # plt.plot(points)
    plt.show()

def main():
    file = open('test-cases.json', 'w')
    test_json = dict()
    for i in range(1, 7):
        test_name = 'test%d' % i
        test_json[test_name] = []

        points = read_test_case('test-cases/test%d.txt' % i)
        for p in points:
            test_json[test_name].append({ 'x': p[0], 'y': p[1]})
        

    file.write(json.dumps(test_json, indent = 2))
main()