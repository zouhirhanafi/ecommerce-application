package ma.ids.client;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ma.ids.client");

        noClasses()
            .that()
                .resideInAnyPackage("ma.ids.client.service..")
            .or()
                .resideInAnyPackage("ma.ids.client.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..ma.ids.client.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
