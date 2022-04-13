package com.lohika.morning.ml.spark.driver.service.lyrics;

public enum Genre {

    SOUL("Soul", 0D),
    POP("Pop", 1D),
    COUNTRY("Country", 2D),
    BLUES("Blues", 3D),
    JAZZ("Jazz", 4D),
    REGGAE("Reggae", 5D),
    ROCK("Rock", 6D),
    HIPHOP("Hip Hop", 7D),
    UNKNOWN("Unknown", -1D);

    private final String name;
    private final Double value;

    Genre(final String name, final Double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Double getValue() {
        return value;
    }

}
