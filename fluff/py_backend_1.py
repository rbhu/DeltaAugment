from multiprocessing import Queue, Lock, Process
import socket

def listenOnSocket(socket):
    # while True:
        # listen on socket
        # on incomming data, put on queue
    pass


def returnOnSocket(augmentedImages, socket):
    # return the resultant augmented images to the node process?
    # or upload directly to S3 and tell node it's done
    pass


def worker(image):
    # for i in range(numOfAugmentations):
        # augment image
        # save somewhere temp
    #return [list of augmented images]
    pass


def master():
    # while True:
        # read from queue
        # spawn worker thread with item from queue
        # have a maximum of 4 workers at once
        # wait for worker to finish
        # returnOnSocket()
    pass


def main():
    # spawn Master and listenOnSocket threads
    pass


if __name__ == "__main__":
    main()
