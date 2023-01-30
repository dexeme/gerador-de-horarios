import random

# dict containing the subjects as keys and the number of classes as values

# function that returns the classes_reference dict with the subjects randomly assigned based on the number classes each subject has in the subjects_reference dict, and without overlapping between years 
def assign_subjects():

    sub_ref1 = {
        "MAT": 4,
        "POR": 4,
        "CIE": 3,
        "GEO": 3,
        "HIS": 3,
        "ING": 3,
        "EDF": 3,
        "ART": 2,
    }
    sub_ref2 = sub_ref1.copy()
    sub_ref3 = sub_ref1.copy()
    sub_ref4 = sub_ref1.copy()


    # dict containing year as key and a list containing 25 empty strings as value
    cls_ref = {
        "Year 7": [""] * 25,
        "Year 8": [""] * 25,
        "Year 9": [""] * 25,
        "Year 10": [""] * 25,
    }

    def get_fixed_subjecs(cell):
        fixed_subjects = [cls_ref["Year 7"][cell], cls_ref["Year 8"][cell], cls_ref["Year 9"][cell], cls_ref["Year 10"][cell]]
        return fixed_subjects

    def get_available_subjects(fixed_subjects):
        
        avlb_sub_ref = {
           'Year 7': [sub for sub in sub_ref1 if sub != fixed_subjects[0] and sub_ref1[sub] > 0 for i in range(sub_ref1[sub])],
           'Year 8': [sub for sub in sub_ref2 if sub != fixed_subjects[1] and sub_ref2[sub] > 0 for i in range(sub_ref2[sub])],
           'Year 9': [sub for sub in sub_ref3 if sub != fixed_subjects[2] and sub_ref3[sub] > 0 for i in range(sub_ref3[sub])],
           'Year 10': [sub for sub in sub_ref4 if sub != fixed_subjects[3] and sub_ref4[sub] > 0 for i in range(sub_ref4[sub])],
        }
        return avlb_sub_ref


    def generate_nth_cell_of_each_table(available_subjects, fixed_subjects):
        list_of_chosen_subjects = fixed_subjects.copy()
        counter = 0
        while len(set(list_of_chosen_subjects)) != 4: 
            for i, year in enumerate(cls_ref):
                if fixed_subjects[i] == "":
                    list_of_chosen_subjects[i] = random.choice(available_subjects[year])

            counter += 1
            if counter >= 1000:
                print("Trying again from scratch")
                return None

        return list_of_chosen_subjects

    def decrement_subject_count(list_of_subjects):
            sub_ref1[list_of_subjects[0]] -= 1
            sub_ref2[list_of_subjects[1]] -= 1
            sub_ref3[list_of_subjects[2]] -= 1
            sub_ref4[list_of_subjects[3]] -= 1

    def assign_subjects_to_cells(list_of_chosen_subjects, cell):
        for i, year in enumerate(cls_ref):
            cls_ref[year][cell] = list_of_chosen_subjects[i]
        
    for cell in range(25):
        fixed_subjects = get_fixed_subjecs(cell)
        available_subjects = get_available_subjects(fixed_subjects)
        list_of_chosen_subjects = generate_nth_cell_of_each_table(available_subjects, fixed_subjects)
        if list_of_chosen_subjects == None:
            return None
        decrement_subject_count(list_of_chosen_subjects)
        assign_subjects_to_cells(list_of_chosen_subjects, cell)

    return cls_ref

def format_cls_ref(cls_ref):
    for year in cls_ref:
        print(year)
        for i in range(0, 25, 5):
            print(cls_ref[year][i:i+5])
        print()

cls_ref = None
while True:
    cls_ref = assign_subjects()
    if cls_ref != None:
        break

format_cls_ref(cls_ref)
    