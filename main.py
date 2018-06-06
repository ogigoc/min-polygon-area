import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon

def read_test_case(path):
    lines = open(path, 'r').readlines()
    return [[float(l.split(' ')[0]), float(l.split(' ')[1])] for l in lines[1:]]

def plot_polygon(points):
    polygon = Polygon(points, True)
    fig, ax = plt.subplots()
    ax.add_patch(polygon)
    plt.autoscale()
    # plt.plot(points)
    plt.show()

def main():
    points = read_test_case('test-cases/test1.txt')
    points = np.array(points)
    print(points)
    plot_polygon(points)
main()