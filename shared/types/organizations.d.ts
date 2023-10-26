export { }

declare global {
    interface AddOrganizationDto {
        name: string;
        description: string;
    }

    interface OrganizationDto extends AddOrganizationDto {
        _id: string;
    }
}